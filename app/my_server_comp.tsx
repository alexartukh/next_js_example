async function getServerData(): Promise<String> {
        // Игнорируем невалидные SSL-сертификаты в Node.js
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        // fetch c дополнительным заголовком
        const res = await fetch('http://localhost:5053/bbb/', {
            headers: {
                // API-ключ хранится в .env.local и полностью защищен
                'Authorization': `Bearer ${process.env.MY_SECRET_API_KEY}`,
            },
        });

        // В серверных компонентах ошибки нужно обрабатывать вручную
        if (!res.ok) {
            throw new Error('Fetch Error');
        }

        return res.json();
    }

interface MyServerComponentProps {
    name: string;
}

export default async function MyServerComponent( { name }: MyServerComponentProps ) {

    console.log("My Server Component " + name + " - CREATED");

    const serverData = await getServerData();

    return (
        <div>My Server Component "{ name }" ( { serverData } )</div>
    )
}