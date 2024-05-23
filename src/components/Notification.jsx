const Notification = ({ message, error}) => {
    if (message === null) {
        return null;
    } else {
        if (error === true) {
            return (
                <div className="errormessage">
                    {message}
                </div>
            );
        } else {
            return (
                <div className="successmessage">
                    {message}
                </div>
            )
        }
    }
}

export default Notification;