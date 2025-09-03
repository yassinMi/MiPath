
/**
 * corresponds to the User dto returned by most apis
 */
export interface AccountInfo {
   userId?: string,
   email?: string,
   name?: string,
   isGuest: boolean
}
