
    export interface IFee {
        id: number;
        event_id: number;
        name: string;
        amount: string;
        valid_upto?: any;
        status: number;
        created_at: Date;
        updated_at: Date;
        resource_url: string;
    }

    export interface IEvent {
        id: number;
        slug: string;
        name: string;
        start_at: Date;
        end_at: Date;
        location: string;
        resource_url: string;
        fees: IFee[];
        allow_dob_certificate:Number
        allow_optional_email:Number
    }


