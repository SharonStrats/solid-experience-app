// https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25599878#overview
import {useCallback, useState} from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });
            if (!response.ok) {
                throw new Error('Request failed')
            }
            const data = await response.json();

            applyData(data)
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'Something went wrong')
        }
        setIsLoading(false)
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;

/* to use it
import it
const transformTasks = useCallback(tasksObj => {
    const loadedTasks = []
    for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text})
    }
    setTasks(loadedTasks)
}, [])

useEffect(() => {
fetchTasks(sendparaments, transformTasks);
}, [fetchTasks]}

const {isLoading, error, sendRequest: fetchTasks } = useHttp();


 */