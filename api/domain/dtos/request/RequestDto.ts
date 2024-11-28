/**
 * Base class for requests, all requests should inhertit this base class
 * Used to provide validations for requests
 */
export interface RequestDto {

    isRequiredAvailable(): boolean;
}