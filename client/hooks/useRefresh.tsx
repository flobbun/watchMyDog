import fetcher from "../lib/fetcher"

const useRefresh = () => {

    const refreshSession = async (token: string) => {
        return await fetcher({
            url: "/auth/refresh",
            method: 'post',
            body: {
                token
            }
        })
    }

    return {
        refreshSession
    }

}

export default useRefresh