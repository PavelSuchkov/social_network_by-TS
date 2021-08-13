import {follow, toggleFollowingInProgress} from "./usersPageReducer";
import {usersAPI} from "../api/users-API";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-API');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))


test('follow thunk test', async () => {

    const thunk = follow(1);
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();


    await thunk(dispatchMock, getStateMock, {});
    // expect(dispatchMock).toBeCalledTimes(3) // was called 3 times
    expect(dispatchMock).toHaveBeenCalledWith(1, toggleFollowingInProgress(true, 1));

})