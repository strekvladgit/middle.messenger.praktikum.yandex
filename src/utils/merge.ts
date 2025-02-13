import { Indexed } from "../framework/Block";

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            const rhsValue = rhs[p];
            const lhsValue = lhs[p];

            if (typeof rhsValue === 'object' && rhsValue !== null) {
                if (Array.isArray(rhsValue)) {
                    // Если это массив, то просто копируем
                    lhs[p] = [...rhsValue];
                } else {
                    // Если это объект, то рекурсивно сливаем
                    lhs[p] = merge(lhsValue as Indexed || {}, rhsValue as Indexed);
                }
            } else {
                // Если это не объект и не массив, просто присваиваем значение
                lhs[p] = rhsValue;
            }
        } catch (e) {
            lhs[p] = rhs[p]; // В случае ошибки просто присваиваем значение
        }
    }

    return lhs;
}
