import { LatLngExpression} from 'leaflet';

export interface Avistaje {
  posicion: LatLngExpression;
  nombrecient: string;
  fecha: firebase.firestore.Timestamp;
  comentario: string;
}
