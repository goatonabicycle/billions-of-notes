const SharedStateIndicator = ({ stateId, isModified }) => {
  return

  // TODO: Having this once the state handling is less complex will be super nice.
  // let status = {
  //   message: "New sequence",
  //   details: "(not saved)"
  // };

  // if (loadedFromKeep && !isModified) {
  //   status = {
  //     message: "Viewing saved sequence",
  //     details: "(from kept states)"
  //   };
  // } else if (stateId && !isModified) {
  //   status = {
  //     message: `Viewing shared sequence /${stateId}`,
  //     details: "(from URL)"
  //   };
  // } else if (isModified) {
  //   status = {
  //     message: "Sequence modified",
  //     details: "(unsaved changes)"
  //   };
  // }

  // return (
  //   <div className="text-sm text-gray-400 bg-gray-900/80 backdrop-blur-sm border border-pink-500/20 px-3 py-2 rounded-lg flex justify-between items-center">
  //     <div>{status.message}</div>
  //     <div className="text-xs text-pink-500/50">{status.details}</div>
  //   </div>
  // );
};

export default SharedStateIndicator;