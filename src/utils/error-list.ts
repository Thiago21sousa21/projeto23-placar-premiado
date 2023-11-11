import httpStatus from "http-status";

const errorsList = {

    conflict: () => {
        return {
            type: 'conflict',
            message: 'conflict! this item already exists',
            status: httpStatus.CONFLICT
        }
    },
    notFound: (item = 'item') => {
        return {
            type: 'notFound',
            message: `${item} not found`,
            status: httpStatus.NOT_FOUND
        }
    },
    schema: (errors:string[]|string) => {
        return {
            type: 'schema',
            message: errors,
            status: httpStatus.UNPROCESSABLE_ENTITY
        }
    },
    internal: () => {
        return {
            type: 'internal',
            message: 'sorry, something went wrong',
            status: httpStatus.INTERNAL_SERVER_ERROR
        }
    },
    insufficientBalance: () => {
        return {
            type: 'insufficientBalance',
            message: 'sorry, insufficient balance',
            status: httpStatus.PAYMENT_REQUIRED
        }
    },
    gameAlreadCompleted: () => {
        return {
            type: 'gameAlreadCompleted',
            message: 'It is not possible to place the bet as the game has already been completed',
            status: httpStatus.CONFLICT
        }
    },
    toFinishFinishedGame: () => {
        return {
            type: 'toFinishFinishedGame',
            message: ' It is not possible to finish a finished game',
            status: httpStatus.CONFLICT
        }
    }
   


}
export default errorsList;