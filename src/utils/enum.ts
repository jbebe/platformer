
export default class EnumHelper {

    private static getKV(type: any): [string[], string[]] {
        const valuesAndKeys = Object.keys(type)
        const [keys, values] = valuesAndKeys
            .reduce(([keys, values], curr, idx, all) =>
                    idx < all.length/2
                        ? [[...keys, curr], values]
                        : [keys, [...values, curr]],
                [[],[]])
        return [keys, values]
    }

    public static getKvMap(type: any){
        const [keys, values] = EnumHelper.getKV(type)
        const enumKvMap: { [key: string]: string } = {}
        keys.forEach((key, i) => {
            enumKvMap[key] = values[i]
        })

        return enumKvMap
    }

    public static getVkMap(type: any){
        const [values, keys] = EnumHelper.getKV(type)
        const enumVkMap: { [key: string]: string } = {}
        keys.forEach((key, i) => {
            enumVkMap[values[i]] = key
        })

        return enumVkMap
    }

    public static getKeys(type: any): string[] {
        return EnumHelper.getKV(type)[0]
    }

    public static getName(val: any, type: any): string {
        const map = this.getVkMap(type)
        return map[val]
    }
}