const weekDays = [
  'ma',
  'ti',
  'ke',
  'to',
  'pe',
  'la',
  'su'
]

const relativeDays = [
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
  'eräpäivänä',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
]

const months = ['Tammi',
  'Helmi',
  'Maalis',
  'Huhti',
  'Touko',
  'Kesä',
  'Heinä',
  'Elo',
  'Syys',
  'Loka',
  'Marras',
  'Joulu']

const deltaList = [
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0,
  -1,
  -2,
  -3,
  -4,
  -5,
  -6,
  -7,
]

const defaultremindertext = 'Hei! Tämä on automaattinen muistutus palkka-ainestojen toimituksen lähestyvästä eräpäivästä. T. Reilu Hallinto'

export default { weekDays, relativeDays, defaultremindertext, months, deltaList }
