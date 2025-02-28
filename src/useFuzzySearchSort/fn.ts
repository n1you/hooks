type FN<T extends Array<any> = []> = (
    sortStandard: SortParams<T>['sortStandard'],
    mapKey: string,
) => number | undefined;

type SortParams<T extends Array<any> = []> = {
    dataSource: T;
    sortStandard: string;
    /**
     *  用于排序的字段key
     */
    sortKey: string;
    beforeFn?: FN<T>;
    affterFn?: (...arg: [...Parameters<FN<T>>, number]) => void;
};

const ignoreCaseIndexOf = (target: string, key: string) => target.toUpperCase().indexOf(key.toUpperCase());

export const sort = <T extends Array<any>>(params: SortParams<T>): T => {
    const {
        dataSource,

        beforeFn,
        affterFn,

        sortStandard,
        sortKey,
    } = params;

    return dataSource.sort((a, b) => {
        const [{ [sortKey]: preData }, { [sortKey]: nextData }] = [a, b];

        const mapKey = `${preData}-${nextData}`;
        const preCheckData = beforeFn?.(sortStandard, mapKey);

        if (typeof preCheckData !== 'undefined') {
            return preCheckData;
        }

        const [preKeywordPosition, nextKeywordPosition] = [
            ignoreCaseIndexOf(preData, sortStandard),
            ignoreCaseIndexOf(nextData, sortStandard),
        ];

        const [
            preBeforeLen,
            nextBeforeLen,
            //
            preAfterLen,
            nextAfterLen,
        ] = [
            preKeywordPosition,
            nextKeywordPosition,
            preData.length - (preKeywordPosition + sortStandard.length),
            nextData.length - (nextKeywordPosition + sortStandard.length),
        ];

        /**
         *
         *  前后字符总长度比较
         *  左侧长度比较后
         *  的结果
         */
        const result = preBeforeLen + preAfterLen - (nextAfterLen + nextBeforeLen) || preBeforeLen - nextBeforeLen;

        affterFn?.(sortStandard, mapKey, result);

        return result;
    });
};

export const filter = <T extends Record<string, string>>(params: {
    dataSource: Array<T>;
    key: keyof T;
    filterValue: string;
}) => {
    const { dataSource, key, filterValue } = params;

    return dataSource.filter((item) => ignoreCaseIndexOf(item[key], filterValue) >= 0);
};

export const getFuzzySearchSortData = <T extends Record<string, any>>(
    dataSource: T[],
    sortValue: string | undefined,
    sortKey: keyof T,
) => {
    return sortValue
        ? sort({
              dataSource: filter({
                  filterValue: sortValue,
                  key: sortKey,
                  dataSource,
              }),
              sortStandard: sortValue!,
              sortKey: sortKey as string,
          })
        : dataSource;
};
