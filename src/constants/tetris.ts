export enum ETetrisColors {
    BLUE = 'blue',
    GREEN = 'green',
    YELLOW = 'yellow',
    ORANGE = 'orange',
    RED = 'red'
}

export enum ETetrisDirections {
    UP = 'UP',
    DOWN = 'DOWN',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT'
}

export const T_FIGURE_POSSIBLE_DIRECTIONS = [ETetrisDirections.UP, ETetrisDirections.RIGHT, ETetrisDirections.DOWN, ETetrisDirections.LEFT]