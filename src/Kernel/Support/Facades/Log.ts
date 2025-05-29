import Log from '../../Classes/Log.js';

export default function (file: string): Log {
    return new Log(file);
}