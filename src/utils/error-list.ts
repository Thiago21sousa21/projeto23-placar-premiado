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
    }

}
export default errorsList;