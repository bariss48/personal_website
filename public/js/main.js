document.addEventListener('DOMContentLoaded', () => {
    hljs.initHighlightingOnLoad();
  
    const codeBlock = document.getElementById('code');
    const copyButton = document.getElementById('copy-button');
    const copySuccess = document.getElementById('copy-success');
  
    const codeBlock_2 = document.getElementById('code_2');
    const copyButton_2 = document.getElementById('copy-button_2');
    const copySuccess_2 = document.getElementById('copy-success_2');

    const copyTextHandler = () => {
      const text = codeBlock.innerText;
  
      // first version - document.execCommand('copy');
      // var element = document.createElement('textarea');
      // document.body.appendChild(element);
      // element.value = text;
      // element.select();
      // document.execCommand('copy');
      // document.body.removeChild(element);
  
      // copySuccess.classList.add('show-message');
      // setTimeout(() => {
      //   copySuccess.classList.remove('show-message');
      // }, 2500);
  
      //   second version - Clipboard API
      navigator.clipboard.writeText(text).then(
        () => {
          copySuccess.classList.add('show-message');
          setTimeout(() => {
            copySuccess.classList.remove('show-message');
          }, 2500);
        },
        () => {
          console.log('Error writing to the clipboard');
        }
      );
    };
  
    copyButton.addEventListener('click', copyTextHandler);

    const copyTextHandler_2 = () => {
      const text = codeBlock_2.innerText;
  
      // first version - document.execCommand('copy');
      // var element = document.createElement('textarea');
      // document.body.appendChild(element);
      // element.value = text;
      // element.select();
      // document.execCommand('copy');
      // document.body.removeChild(element);
  
      // copySuccess.classList.add('show-message');
      // setTimeout(() => {
      //   copySuccess.classList.remove('show-message');
      // }, 2500);
  
      //   second version - Clipboard API
      navigator.clipboard.writeText(text).then(
        () => {
          copySuccess.classList.add('show-message');
          setTimeout(() => {
            copySuccess_2.classList.remove('show-message');
          }, 2500);
        },
        () => {
          console.log('Error writing to the clipboard');
        }
      );
    };
  
    copyButton_2.addEventListener('click', copyTextHandler_2);
  });