import { version } from "../../package.json";
export default eventHandler(async (event) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gameState Server</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            padding: 0 4px 0 4px;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: #fff;
            text-align: center;
        }
        .container {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin: 0;
            font-size: 3em;
        }
        p {
            font-size: 1.2em;
            margin: 10px 0 0;
        }
        .button {
            margin-top: 20px;
        }
        .button a {
            text-decoration: none;
            color: #fff;
            background: #2575fc;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background 0.3s;
        }
        .button a:hover {
            background: #6a11cb;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>The <i>game</i>State server!</h1>
        <p>v${version}</p>
        <p>Click below to enjoy it via the dedicated web app</p>
        <div class="button">
            <a href="https://dv-gamestate.netlify.app/">Go to <i>game</i>State</a>
        </div>
    </div>
</body>
</html>
`;
});
