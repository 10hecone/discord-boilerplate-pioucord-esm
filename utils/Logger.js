import chalk from 'chalk'
import dayjs from 'dayjs'

const format = '{tstamp} {tag} {txt}\n'

export function error(content) {
    write(content, 'black', 'bgRed', 'ERROR', true)
}

export function warn(content) {
    write(content, 'black', 'bgYellow', 'WARN', false)
}

export function typo(content) {
    write(content, 'black', 'bgCyan', 'TYPO', false)
}

export function command(content) {
    write(content, 'black', 'bgMagenta', 'CMD', false)
}

export function event(content) {
    write(content, 'black', 'bgGreen', 'EVT', true)
}

export function client(content) {
    write(content, 'black', 'bgBlue', 'CLIENT', false)
}

function write(content, tagColor, bgTagColor, tag, error = false) {
    const timestamp = `[${dayjs().format('DD/MM -HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tstamp}', chalk.gray(timestamp))
        .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
        .replace('{txt}', chalk.white(content));

    stream.write(item)
}
