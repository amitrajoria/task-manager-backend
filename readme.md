/auth/signup    POST
    request = {name, email, password}
    response = {msg}

/auth/login     POST
    request = {email, password}
    response = {msg, token}

/tasks          GET
    request = {token}
    response = {data}

/tasks/create   POST
    request = {token, taskData}
    response = {msg}

/tasks/edit/:taskId     PATCH
    request = {token, taskData}
    response = {msg}

/tasks/delete/:taskId   DELETE
    request = {token}
    response = {msg}

/tags          GET
    request = {token}
    response = {data}

/tags/create   POST
    request = {token, tagData}
    response = {msg}

/subtasks/:taskId      GET
    request = {token}
    response = {data}

/subtasks/:taskId/create    POST
    request = {token, taskData}
    response = {msg} 

/subtasks/:taskId/delete/subTaskId  PATCH
    request = {token}
    response = {msg}   


/subtasks/:taskId/delete/subTaskId  DELETE
    request = {token}
    response = {msg}   
