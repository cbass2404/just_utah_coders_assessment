const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line import/no-anonymous-default-export
export default function (email) {
    if (!re.test(email)) {
        return "Enter a valid email";
    }

    return;
}
