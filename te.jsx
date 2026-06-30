import {supabase} from './src/lib/supabase.js';

export function Test() {
        const tryIt = async () => {
                const {data, error} = await supabase.functions.invoke(
                        "create-circle-user"
                );
        console.log(data);
        console.log(error);
        }

        return (
                <>
                        <button onClick={tryIt}>test it</button>
                </>
        );
}
export default Test;
