export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
export const NON_EXISTENT_ID: number = -1;

export class Queries {

    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";
}