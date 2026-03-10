import { Equipment, UserRole } from './types';

export const EQUIPMENT_DATA: Equipment[] = [
  // Tandem 1
  { id: 't1-1200', name: '1200T', line: 'Tandem 1', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't1-800', name: '800T', line: 'Tandem 1', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't1-600', name: '600T', line: 'Tandem 1', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't1-400', name: '400T', line: 'Tandem 1', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  
  // Tandem 2
  { id: 't2-1200', name: '1200T', line: 'Tandem 2', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't2-800', name: '800T', line: 'Tandem 2', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't2-600', name: '600T', line: 'Tandem 2', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't2-400-1', name: '400T (1)', line: 'Tandem 2', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't2-400-2', name: '400T (2)', line: 'Tandem 2', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // Tandem 3
  { id: 't3-1000', name: '1000T', line: 'Tandem 3', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't3-800', name: '800T', line: 'Tandem 3', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't3-600', name: '600T', line: 'Tandem 3', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't3-400-1', name: '400T (1)', line: 'Tandem 3', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't3-400-2', name: '400T (2)', line: 'Tandem 3', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // Tandem 4
  { id: 't4-1000', name: '1000T', line: 'Tandem 4', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't4-800', name: '800T', line: 'Tandem 4', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't4-600-1', name: '600T (1)', line: 'Tandem 4', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 't4-600-2', name: '600T (2)', line: 'Tandem 4', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // Boshqa liniyalar
  { id: 'awh', name: 'AWH', line: 'Boshqa liniyalar', type: 'Auxiliary', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'blank', name: 'BLANK LINE', line: 'Boshqa liniyalar', type: 'Line', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: '630t', name: '630T press', line: 'Boshqa liniyalar', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: '1500t', name: '1500T gidravlik DAI press', line: 'Boshqa liniyalar', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'slitte', name: 'Slitte line', line: 'Boshqa liniyalar', type: 'Line', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'main-conv', name: 'Main conveyor', line: 'Boshqa liniyalar', type: 'Conveyor', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'skrap', name: 'Skrap baller', line: 'Boshqa liniyalar', type: 'Auxiliary', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // SMALL PRESS – A line
  { id: 'spa-nc', name: 'NC liveller', line: 'SMALL PRESS – A', type: 'Feeder', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-200-1', name: '200T (1)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-250', name: '250T', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-200-2', name: '200T (2)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-200-3', name: '200T (3)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-200-4', name: '200T (4)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-200-5', name: '200T (5)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-160-1', name: '160T (1)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-160-2', name: '160T (2)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spa-160-3', name: '160T (3)', line: 'SMALL PRESS – A', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // SMALL PRESS – B line
  { id: 'spb-nc', name: 'NC liveller', line: 'SMALL PRESS – B', type: 'Feeder', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-250', name: '250T', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-200-1', name: '200T (1)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-200-2', name: '200T (2)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-160-1', name: '160T (1)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-160-2', name: '160T (2)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-160-3', name: '160T (3)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-160-4', name: '160T (4)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-110-1', name: '110T (1)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spb-110-2', name: '110T (2)', line: 'SMALL PRESS – B', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // SMALL PRESS – C line
  { id: 'spc-160-1', name: '160T (1)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-110-1', name: '110T (1)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-110-2', name: '110T (2)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-110-3', name: '110T (3)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-110-4', name: '110T (4)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-160-2', name: '160T (2)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-160-3', name: '160T (3)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-110-5', name: '110T (5)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spc-110-6', name: '110T (6)', line: 'SMALL PRESS – C', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },

  // SMALL PRESS – D line
  { id: 'spd-nc', name: 'NC liveller', line: 'SMALL PRESS – D', type: 'Feeder', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-250-1', name: '250T (1)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-250-2', name: '250T (2)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-250-3', name: '250T (3)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-200-1', name: '200T (1)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-250-4', name: '250T (4)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-250-5', name: '250T (5)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-200-2', name: '200T (2)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
  { id: 'spd-200-3', name: '200T (3)', line: 'SMALL PRESS – D', type: 'Press', status: 'OK', docs: { electrical: '#', mechanical: '#', plc: '#' } },
];

export const ROLES = [
  UserRole.MECHANIC,
  UserRole.ELECTRICAL,
  UserRole.PLC,
  UserRole.CHIEF_MECHANIC,
  UserRole.ADMIN,
  UserRole.SUPERVISOR
];
