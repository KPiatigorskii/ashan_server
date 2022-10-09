export const DB_CONNECTION_STRING: string = "server=.;Database=ashan_store;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
export const NON_EXISTENT_ID: number = -1;

export class Queries {

    public static ProductById: string = "SELECT * FROM product WHERE id = ?";

    public static StoreById: string = "SELECT * FROM store WHERE id = ?";

    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";
}