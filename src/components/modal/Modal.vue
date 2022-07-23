<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div @click.self="$emit('close')" class="modal-wrapper">
        <div class="modal-container">
          <slot name="x"></slot>
          <slot name="whole"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 30px 30px 50px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  form.form-auth {
    display: flex;
    gap: 20px;
    flex-direction: column;

    div.is-loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgb(154, 154, 154 / 50%);
      border-radius: 10px;
    }
    div.is-loading div.ui-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div.is-loading div.ui-spinner div {
      align-self: center;
    }

    h1 {
      font-size: 22px;
      line-height: 28px;
      font-weight: 700;
      margin: 0;
      color: $site-primary-color;
    }

    section.errors {
      ul {
        margin: 0;
        padding: 0 0 0 15px;
      }
      h2, li, p {
        color: $init-text-error-color;
        font-size: 14px;
        line-height: 20px;
        margin: 0;
      }
      h2 {
        margin: 0 0 3px;
      }
    }

    div.fields {
      display: flex;
      flex-direction: column;
      gap: 15px;

      div.field {
        label {
          font-size: 14px;
          color: $init-highlight-color;
          margin: 0 0 7px;
        }
        input:focus {
          outline: none;
        }
        input {
          border: 1px solid #CADEF4;
          border-radius: 3px;
          font-weight: regular;
          font-size: 14px;
          color: #0B2037;
          width: 100%;
          padding: 0 10px;
          height: 46px;
          border-radius: 7px;
          background-color: #F4FFFC;
        }
      }
    }

    button {
      border: none;
      background: $site-primary-color;
      color: #fff;
      border-radius: 3px;
      font-weight: bold;
      width: 150px;
      height: 40px;
      border-radius: 10px;
    }

    div.access {
      display: flex;
      flex-direction: column;
      gap: 10px;

      a {
        display: block;
        font-size: 14px;
        line-height: 18px;
        color: $init-highlight-color;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
