import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
});

export async function sendMsgToOpenAI(message) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(chatCompletion)
    return chatCompletion.choices[0].message.content;
}
