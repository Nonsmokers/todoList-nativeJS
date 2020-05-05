function _createModal(options){
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');
    modal.classList.add('smodal');
    modal.insertAdjacentHTML('afterbegin',`

        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-tittle">${options.tittle || 'Окно'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>`: ''}
                </div>
                <div class="modal-body">
                    ${options.content || ''}
                </div>
                <div class="modal-footer">
                    <button class='add-task-modal' data-close="close">Ok</button>
                    <button class='add-task-modal' data-close="close">Cancel</button>
                </div>
            </div>
        </div>
    `)
    document.body.appendChild(modal)
    return modal;
}

$.modal = function(options){
    const ANIMATION_SPEED = 200;
    const $modal =_createModal(options);

    const modal = {
        open() {
            $modal.classList.add('open');
        },
        close() {
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(()=>{
                $modal.classList.remove('hide');
            },ANIMATION_SPEED)
        },
        destroy() {}
    }

    $modal.addEventListener('click', event=>{
        if (event.target.dataset.close){
            modal.close();
        }
    })
    return modal
}

// let step=0;
// function hendler(event) {
//         console.log(event.target)
//     const closeModal = document.querySelector('.modal-close');
//     if(event.target ===closeModal){
//         console.log(step++)
//         document.remove('.smodal');
//     }

// }

// document.addEventListener('click',hendler)
