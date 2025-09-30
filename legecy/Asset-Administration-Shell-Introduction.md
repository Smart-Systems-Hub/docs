# AAS (Asset Administration Shell) Introduction

## **What is AAS (Asset Administration Shell)?**

The Asset Administration Shell (AAS) is like a digital ID card or
digital twin for a physical object (an \"asset\") in a smart factory ---
such as a machine, sensor, or even a software system.

In simple word: Think of AAS as a digital wrapper around a machine or
device. It stores all important information about the asset in one place
--- including:

-   What it is (type, manufacturer)

-   What it can do (functions, features)

-   How to use or control it (interfaces, settings)

-   How it behaves (status, performance)

-   How it should be maintained (manuals, lifecycle data)

This digital shell helps machines and systems understand each other,
talk to each other, and work together more easily.

### **Example:**

Imagine you buy a robot arm. It comes with:

-   A physical arm (the asset)

-   An AAS that has all its data --- speed, range, error codes, manuals,
    etc.

Your factory system can read the AAS and instantly know how to use and
monitor the robot.

## **What is an AAS Submodel?**

An AAS Submodel is like a section or chapter in the Asset Administration
Shell (AAS) --- each one focuses on a specific topic or aspect of the
asset.

Imagine the AAS as a digital book about a machine.\
Each submodel is a chapter in that book:

-   One submodel might be about technical specifications.

-   Another about operating conditions.

-   Another about energy usage, or maintenance history, or
    certifications.

Each submodel is structured and machine-readable --- so software systems
can understand it easily.

### **Common Examples of Submodels:**

1.  Identification -- Serial number, manufacturer, model.

2.  Documentation -- Manuals, datasheets.

3.  Status -- Current state, health, error messages.

4.  Maintenance -- Service intervals, repair logs.

5.  Energy Consumption -- Power usage, efficiency.

6.  Capabilities -- What the asset can do (functions, APIs).

### **Example:**

You have a CNC machine. Its AAS might contain:

-   A submodel for basic info (ID, vendor)

-   A submodel for energy usage

-   A submodel for available services (like "start job", "stop job")

-   A submodel for predictive maintenance

Each one is a plug-in module of data, reusable and standardized.
