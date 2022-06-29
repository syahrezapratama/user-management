<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Bestätigung</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="tryClose"
            ></button>
          </div>
          <div class="modal-body">
            <p>Möchten Sie den Datensatz wirklich löschen?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="tryClose"
            >
              Abbrechen
            </button>
            <button type="button" class="btn btn-primary" @click="confirmAction">Bestätigen</button>
          </div>
        </div>
      </div>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: ["show"],
  emits: ["close", "confirm"],
  methods: {
    tryClose() {
      this.$emit("close");
    },
    confirmAction() {
      this.$emit("confirm")
    }
  }
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
dialog {
  position: fixed;
  top: 10vh;
  z-index: 100;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  background: none;
}
.modal-dialog {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
