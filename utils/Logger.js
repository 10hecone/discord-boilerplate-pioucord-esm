import chalk from 'chalk'
import dayjs from 'dayjs'

const format = '{tstamp} {tag} {txt}\n'

export const {error, warn, typo, command, event, client} = {
    error(content) {
        write(content, 'black', 'bgRed', 'ERROR', true)
    },
    
    warn(content) {
        write(content, 'black', 'bgYellow', 'WARN', false)
    },
    
    typo(content) {
        write(content, 'black', 'bgCyan', 'TYPO', false)
    },
    
    command(content) {
        write(content, 'black', 'bgMagenta', 'CMD', false)
    },
    
    event(content) {
        write(content, 'black', 'bgGreen', 'EVT', true)
    },
    
    client(content) {
        write(content, 'black', 'bgBlue', 'CLIENT', false)
    }
}


function write(content, tagColor, bgTagColor, tag, error = false) {
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tstamp}', chalk.gray(`[${dayjs().format('DD/MM -HH:mm:ss')}]`))
        .replace('{tag}', chalk[bgTagColor][tagColor](`[${tag}]`))
        .replace('{txt}', chalk.white(content));

    stream.write(item)
};
