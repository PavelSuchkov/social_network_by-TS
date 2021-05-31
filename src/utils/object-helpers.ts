export const updateObjectInArray = (item: Array<any> , itemId: number, objPropName: number | string, newObjProps: any) => {
   return item.map(u => {
        if (u[objPropName] === itemId) {
            return {u, ...newObjProps}
        }
        return u;
    })
}