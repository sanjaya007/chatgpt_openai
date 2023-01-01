import { openai } from "../openai.js";

const getData = async (req, res) => {
  res.status(200).send({
    message: "You are using AI",
  });
};

const postData = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 3000,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export { getData, postData };
