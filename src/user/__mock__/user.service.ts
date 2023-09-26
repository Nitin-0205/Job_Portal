export const UserService = jest.fn().mockReturnValue({

    create : jest.fn().mockResolvedValue({msg:"User SignUp Successfull !!!"}),
    userLogin : jest.fn().mockResolvedValue({msg:"User Login Successfull !!!",userId:"123",token:"123"}),
    validate : jest.fn().mockResolvedValue({msg:"User Login Successfull !!!",userId:"123",token:"123"}),    
})