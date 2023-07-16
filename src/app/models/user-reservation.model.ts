enum typeReservations {
  cena = 'cena',
  almuerzo = 'almuerzo',
  onces = 'onces',
  cumpleanos = 'cumplea#os',
  ocasion_especial = 'ocasion especial'
};

export class UserReservation {
    identificacion_document: string = '';
    type_rol?: number;
    name: string = '';
    last_name: string = '';
    type_document: string = '';
    email: string = '';
    reservation_date : string = '';
    reservation_type : string = '';
    people_quantity : number = 0;
    description: string = '';
    observation: string = '';
    is_confirm?: number;
}


