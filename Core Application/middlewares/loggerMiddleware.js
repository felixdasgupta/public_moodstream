const loggerWare = store => next => action => {
  const result = next(action);
  //console.log(action);
};

export default loggerWare;
