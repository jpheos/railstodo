// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';



function getCurrentGitBranch(documentUri: vscode.Uri): string | undefined {
  const extension = vscode.extensions.getExtension('vscode.git');
  if (!extension) {
    console.warn("Git extension not available");
    return undefined;
  }
  if (!extension.isActive) {
    console.warn("Git extension not active");
    return undefined;
  }

  // "1" == "Get version 1 of the API". Version one seems to be the latest when I
  // type this in 2023-10-01
  const git = extension.exports.getAPI(1);
  const repository = git.getRepository(documentUri);
  if (!repository) {
    console.warn("No Git repository for current document", documentUri);
    return undefined;
  }

  const currentBranch = repository.state.HEAD;
  if (!currentBranch) {
    console.warn("No HEAD branch for current document", documentUri);
    return undefined;
  }

  const branchName = currentBranch.name;
  if (!branchName) {
    console.warn("Current branch has no name", documentUri, currentBranch);
    return undefined;
  }

  return branchName;
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "railstodo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('railstodo', () => {
		const documentUri = vscode.window.activeTextEditor?.document.uri;

		if (documentUri) {
			const gitBranch 	= getCurrentGitBranch(documentUri);
        if (gitBranch !== undefined) {
					const editor = vscode.window.activeTextEditor;
					if (editor) {
						console.log('je suis dans le if edoitor')
						console.log(editor.document.languageId)
						if (editor.document.languageId === 'javascript') {
							editor.insertSnippet(new vscode.SnippetString(`// TODO ${gitBranch}: \${1:description}`));
						} else if (editor.document.languageId === 'typescript') {
							editor.insertSnippet(new vscode.SnippetString(`// TODO ${gitBranch}: \${1:description}`));
						} else if (editor.document.languageId === 'ruby') {
							editor.insertSnippet(new vscode.SnippetString(`# TODO ${gitBranch}: \${1:description}`));
						} else if (editor.document.languageId === 'erb') {
							editor.insertSnippet(new vscode.SnippetString(`<%# TODO ${gitBranch}: \${1:description} %>`));
						}
					}
        }
		} else {
			console.log('No document');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
