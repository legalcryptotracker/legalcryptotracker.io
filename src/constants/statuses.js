export const STATUS_NAMES = {
  regulated: 'regulated',
  regulated_legal: 'regulated_legal',
  forbidden: 'forbidden',
  bill: 'bill',
  not_regulated: 'Not regulated',
  sandbox: 'sandbox',
  none: 'none'

  // RESEARCH: 'Research',
  // DEVELOPMENT: 'Development',
  // PROOF_OF_CONCEPT: 'Proof of concept',
  // PILOT: 'Pilot',
  // LAUNCHED: 'Launched',
  // CANCELLED: 'Cancelled',
}

export const STATUS_COLOR = {
  regulated: '#FFFF66',
  forbidden: '#CD5C5C',
  bill: '#6A5ACD',
  not_regulated: '#FFA500',
  regulated_legal: '#32CD32',
  sandbox: '#9370DB',
  none: '#F4F8FC',

  [`${STATUS_NAMES.NONE}`]: '#F4F8FC',

  // [`${STATUS_NAMES.RESEARCH}`]: '#B5DED7',
  // [`${STATUS_NAMES.DEVELOPMENT}`]: '#AFA3DA',
  // [`${STATUS_NAMES.PROOF_OF_CONCEPT}`]: '#AFA3DA',
  // [`${STATUS_NAMES.PILOT}`]: '#F1CDB2',
  // [`${STATUS_NAMES.LAUNCHED}`]: '#67A8EF',
  // [`${STATUS_NAMES.CANCELLED}`]: '#EC8596',
}

export const STATUS_BORDER_COLOR = {
  regulated: '#CCCC52',
  forbidden: '#A44A4A',
  bill: '#5548A4',
  not_regulated: '#CC8400',
  regulated_legal: '#28A428',
  sandbox: '#765AAF',
  none: '#DBE6F1',

  [`${STATUS_NAMES.NONE}`]: '#DBE6F1',

  // [`${STATUS_NAMES.RESEARCH}`]: '#6BBEAF',
  // [`${STATUS_NAMES.DEVELOPMENT}`]: '#8F81C7',
  // [`${STATUS_NAMES.PROOF_OF_CONCEPT}`]: '#8F81C7',
  // [`${STATUS_NAMES.PILOT}`]: '#E4A57C',
  // [`${STATUS_NAMES.LAUNCHED}`]: '#4E87D3',
  // [`${STATUS_NAMES.CANCELLED}`]: '#D53E45',
}
