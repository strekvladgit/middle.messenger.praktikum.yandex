export default function cloneDeep<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => cloneDeep(item)) as unknown as T;
    }

    const clonedObj = {} as T;

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = cloneDeep((obj as any)[key]);
        }
    }

    return clonedObj;
}
