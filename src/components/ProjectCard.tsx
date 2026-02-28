
import { useRef, ReactNode, PointerEvent, FC } from 'react';

interface ProjectCardProps {
    children: ReactNode;
    className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ children, className = '' }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);

    const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);
    const round = (value: number, precision = 3) => parseFloat(value.toFixed(precision));
    const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => 
        round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
    const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const updateTransform = (offsetX: number, offsetY: number) => {
        if (!cardRef.current || !wrapperRef.current) return;
        const { clientWidth: width, clientHeight: height } = cardRef.current;
        const percentX = clamp((100 / width) * offsetX);
        const percentY = clamp((100 / height) * offsetY);
        const centerX = percentX - 50;
        const centerY = percentY - 50;

        const properties = {
            '--pointer-x': `${percentX}%`,
            '--pointer-y': `${percentY}%`,
            '--rotate-x': `${round(centerY / 4)}deg`,
            '--rotate-y': `${round(-(centerX / 5))}deg`,
        };
        
        Object.entries(properties).forEach(([property, value]) => {
            wrapperRef.current?.style.setProperty(property, value as string);
        });
    };

    const createSmoothAnimation = (duration: number, startX: number, startY: number) => {
        if (!wrapperRef.current) return;
        const startTime = performance.now();
        const targetX = wrapperRef.current.clientWidth / 2;
        const targetY = wrapperRef.current.clientHeight / 2;

        const animationLoop = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = clamp(elapsed / duration, 0, 1);
            const easedProgress = easeInOutCubic(progress);

            const currentX = adjust(easedProgress, 0, 1, startX, targetY);
            const currentY = adjust(easedProgress, 0, 1, startY, targetY);

            updateTransform(currentX, currentY);

            if (progress < 1) {
                rafId.current = requestAnimationFrame(animationLoop);
            }
        };
        rafId.current = requestAnimationFrame(animationLoop);
    };

    const cancelAnimation = () => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
    };

    const onPointerMove = (event: PointerEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        updateTransform(event.clientX - rect.left, event.clientY - rect.top);
    };

    const onPointerEnter = () => {
        cancelAnimation();
        wrapperRef.current?.classList.add('active');
    };

    const onPointerLeave = (event: PointerEvent) => {
        createSmoothAnimation(600, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        wrapperRef.current?.classList.remove('active');
    };

    return (
        <div ref={wrapperRef} className={`project-card-wrapper ${className}`}>
            <div className="card-background"></div>
            <div 
                ref={cardRef}
                className="project-card"
                onPointerMove={onPointerMove}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
            >
                <div className="card-glare"></div>
                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
