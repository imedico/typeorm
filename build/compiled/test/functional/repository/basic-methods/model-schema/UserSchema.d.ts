declare const _default: {
    name: string;
    table: {
        name: string;
    };
    columns: {
        id: {
            type: NumberConstructor;
            primary: boolean;
            generated: boolean;
        };
        firstName: {
            type: StringConstructor;
            nullable: boolean;
        };
        secondName: {
            type: StringConstructor;
            nullable: boolean;
        };
    };
};
export default _default;
