// Рассчитывает угол для отдельной точки на круге

export const calculatePointAngle = (index: number, totalPoints: number): number => {
    return index * (360 / totalPoints);
};



 // Рассчитывает угол поворота для активного периода



export const calculateRotationAngle = (
    targetIndex: number,// индекс целевого периода
    totalPoints: number,// общее количество периодов
    initialAngle: number = -60// начальный угол (по умолчанию -60°)
): number => {
    const anglePerPoint = 360 / totalPoints;
    return (targetIndex * anglePerPoint) -60;;
};