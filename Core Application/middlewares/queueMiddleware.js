import { QUEUE_TRACK } from "../constants/ActionTypes";
import { queueTrack } from "../actions/queueActions";

const queueWare = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case QUEUE_TRACK: {
      queueTrack(action.id);
      break;
    }

    default:
      break;
  }

  return result;
};

export default queueWare;
