
import * as rt from 'runtypes';

export const runtypeFromEnum = <EnumType>(theEnum: Record<string, EnumType>): rt.Runtype<EnumType> => {
    const values = Object.values<unknown>(theEnum);
    const isEnumValue = (input: unknown): input is EnumType => values.includes(input);
    const errorMessage = (input: unknown): string =>
        `Failed constraint check. Expected one of ${JSON.stringify(values)}, but received ${JSON.stringify(input)}`;
    return rt.Unknown.withConstraint<EnumType>((object: any) => isEnumValue(object) || errorMessage(object));
};