export type Chart = {
    type: ChartTypeEnum,
    title: string,
    labels: string[],
    datasets: ChartDataset[]
}

export type ChartDataset = {
    label: string,
    data: number[],
    backgroundColors: string[]
}

export enum ChartTypeEnum {
    Pie,
    Bar,
    Line
}