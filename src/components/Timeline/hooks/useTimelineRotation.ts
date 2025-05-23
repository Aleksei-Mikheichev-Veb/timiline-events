import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

interface TimelinePeriod {
    id: number;
    startYear: number;
    endYear: number;
    title: string;
    events: any[];
}

interface UseTimelineRotationProps {
    periods: TimelinePeriod[];
    activePeriodId: number;
    initialAngle?: number;
}

export const useTimelineRotation = ({
                                        periods,
                                        activePeriodId,
                                        initialAngle = -60
                                    }: UseTimelineRotationProps) => {
    const circleRef = useRef<HTMLDivElement | null>(null);
    const currentAngleRef = useRef<number>(-60);

    // Функция расчета угла поворота
    const calculateRotationAngle = useCallback((
        targetIndex: number,
        totalPoints: number,
        baseAngle: number = -60
    ): number => {
        const anglePerPoint = 360 / totalPoints;
        return baseAngle - (targetIndex * anglePerPoint);
    }, []);

    // Устанавливаем начальную позицию при монтировании
    useEffect(() => {
        const initialIndex = periods.findIndex(p => p.id === activePeriodId);
        if (initialIndex !== -1 && circleRef.current) {
            const angle = calculateRotationAngle(initialIndex, periods.length, initialAngle);
            gsap.set(circleRef.current, {
                rotation: angle,
                transformOrigin: "center center"
            });
            currentAngleRef.current = angle;
        }
    }, [periods, activePeriodId, initialAngle, calculateRotationAngle]);

    // Анимированный поворот к новому периоду
    const rotateTo = useCallback((periodId: number, onComplete?: () => void) => {
        const targetIndex = periods.findIndex(p => p.id === periodId);
        if (targetIndex === -1 || circleRef.current) return;

        const targetAngle = calculateRotationAngle(targetIndex, periods.length, initialAngle);
        gsap.to(circleRef.current, {
            rotation: targetAngle,
            duration: 0,
            transformOrigin: "center center",
            ease: "power2.inOut",
            onComplete: () => {
                currentAngleRef.current = targetAngle;
                onComplete?.();
            }
        });
    }, [periods, initialAngle, calculateRotationAngle]);

    // Получаем текущий угол поворота
    const getCurrentRotation = useCallback(() => {
        return currentAngleRef.current;
    }, []);

    return {
        circleRef,
        rotateTo,
        getCurrentRotation,
        currentAngle: currentAngleRef.current
    };
};