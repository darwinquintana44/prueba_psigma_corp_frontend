import { MenuItem } from './menu.model';
import { Label } from 'ng2-charts';

export const MENU: MenuItem[] = [
  {
    label: 'Herramientas Generales',
    isTitle: true
  },
  {
    label: 'Tablas Maestras',
    icon: 'settings',
    subItems: [
      {
        label: 'Paises',
        subItems: [
          {
            label: 'Listar Datos',
            link: '/herramientas/paises'
          }
        ]
      },
      {
        label: 'Departamentos',
        subItems: [
          {
            label: 'Listar Datos',
            link: '/herramientas/departamentos'
          }
        ]
      },
      {
        label: 'Municipios',
        subItems: [
          {
            label: 'Listar Datos',
            link: '/herramientas/municipios'
          }
        ]
      }
    ]
  },
  {
    label: 'Módulo Transportes',
    isTitle: true
  },
  {
    label: 'Vehículos',
    icon: 'truck',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/transporte/vehiculos'
      }
    ]
  },
  {
    label: 'Supervisores',
    icon: 'user-check',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/transporte/supervisores'
      },
      {
        label: 'Asignar Conductor',
        link: '/transporte/asignar_conductor'
      }
    ]
  },
  {
    label: 'Conductores',
    icon: 'user-plus',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/transporte/conductores'
      }
    ]
  },

];
