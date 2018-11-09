const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");
const projectDb = require("../data/helpers/projectModel.js");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/projects", (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't get projects" });
    });
});

server.get("/api/actions", (req, res) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't get actions" });
    });
});

server.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;

  projectDb
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "No project found with that id" });
    });
});

server.get("/api/actions/:id", (req, res) => {
  const { id } = req.params;

  actionDb
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: "No action found with that id" });
    });
});

server.get("/api/projects/:id/all", (req, res) => {
  const { id } = req.params;

  projectDb
    .getProjectActions(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "No project found with that id" });
    });
});

server.post("/api/projects", (req, res) => {
  try {
    const projectData = req.body;
    projectDb.insert(projectData);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

server.post("/api/actions", (req, res) => {
  try {
    const actionData = req.body;
    actionDb.insert(actionData);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error adding action" });
  }
});

server.put("/api/projects/:id", (req, res) => {
  const projectData = req.body;
  projectDb
    .update(req.params.id, projectData)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating project" });
    });
});

server.put("/api/actions/:id", (req, res) => {
  const actionData = req.body;
  actionDb
    .update(req.params.id, actionData)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating action" });
    });
});

server.delete("/api/proects/:id", (req, res) => {
  projectDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting project" });
    });
});

server.delete("/api/actions/:id", (req, res) => {
  actionDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting action" });
    });
});

module.exports = {
  server
};
