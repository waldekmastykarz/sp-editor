import { useEffect } from "react";
import { Terminal } from "xterm";
import cli from '@pnp/cli-microsoft365';
import yargs from 'yargs-parser';

const CliM365Terminal = () => {
  let terminalRef: React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const terminal = new Terminal();
    terminal.onData(data => {
      const argv = yargs(data);
      cli.executeCommand(argv._.join(' '), argv, {
        stdout: message => terminal.write(message),
        stderr: message => terminal.write(message)
      })
    });
    terminal.open(terminalRef.current);
  });

  return <div ref={terminalRef} />
}

export default CliM365Terminal