export const INITIAL_CREATE_EVENT_MODAL_PROPS = {
  title: 'Create event',
  isOpen: false,
  event: null,
  buttonSubmitText: 'Create'
};

export const INITIAL_EDIT_EVENT_MODAL_PROPS = {
  title: 'Edit event',
  isOpen: false,
  event: null,
  buttonSubmitText: 'Edit'
};

export const DEFAULT_CREATE_EVENT_MODAL_PROPS = { ...INITIAL_CREATE_EVENT_MODAL_PROPS, isOpen: true };
export const DEFAULT_EDIT_EVENT_MODAL_PROPS = { ...INITIAL_EDIT_EVENT_MODAL_PROPS, isOpen: true };
