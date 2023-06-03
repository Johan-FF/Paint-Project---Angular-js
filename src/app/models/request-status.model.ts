export type RequestStatus = {
    singin: 'EmailError' | 'PasswordError' | 'Correct',
    singup: 'UserError' | 'Correct' | 'InProgress'
}